// Hook afterPack de electron-builder.
//
// Por qué existe (historia original, en Windows): electron-builder respeta
// el .gitignore de la carpeta "from" para CUALQUIER entrada de
// extraResources, incluida una que apunte directo a
// "../rakonti-api/node_modules". Como rakonti-api/.gitignore ignora
// "node_modules/", esa carpeta nunca se copiaba al paquete final, aunque el
// filtro de extraResources la incluyera explícitamente — el backend
// empaquetado quedaba sin sus dependencias (express, pg, bcrypt, etc.) y por
// eso require() fallaba en silencio al abrir la app instalada.
//
// Por qué cambió (macOS, build de CI en GitHub Actions): en el workflow de
// CI, rakonti-sapp y rakonti-api se clonan como carpetas hermanas dentro del
// workspace del runner (igual que en el entorno local del usuario). En
// Windows, extraResources SÍ copió el resto del backend (código fuente) a
// resources/backend antes de este hook, y este script solo tenía que sumar
// node_modules encima. En macOS, en el mismo run, resources/backend nunca
// se creó — extraResources no copió nada ahí, sin ningún error visible en
// el log de electron-builder. En vez de seguir dependiendo de que
// extraResources haga su parte primero (comportamiento que resultó no ser
// confiable entre plataformas), este hook ahora es autosuficiente: copia
// TODO el backend (código + node_modules) él mismo con fs.cpSync, sin
// asumir que resources/backend ya exista con nada adentro.
const fs = require("fs");
const path = require("path");

// Igual que el filtro de build.extraResources en package.json, pero
// aplicado aquí a mano porque este script ya no depende de que
// extraResources haya copiado nada de antemano.
const EXCLUDED_TOP_LEVEL_ENTRIES = new Set([
  "node_modules", // se copia aparte, explícitamente, más abajo
  ".env.local",
  ".env.remote",
  ".git",
  ".gitignore",
]);

function copyBackendSource(backendSrcDir, backendDestDir) {
  fs.mkdirSync(backendDestDir, { recursive: true });

  for (const entry of fs.readdirSync(backendSrcDir)) {
    if (EXCLUDED_TOP_LEVEL_ENTRIES.has(entry)) continue;

    const srcPath = path.join(backendSrcDir, entry);
    const destPath = path.join(backendDestDir, entry);

    if (entry === "db") {
      // db/*.sql y db/*.png quedan fuera del paquete (mismo filtro que
      // extraResources tenía en package.json): el dump y capturas de la BD
      // no hacen falta en tiempo de ejecución y solo pesan más el instalador.
      fs.mkdirSync(destPath, { recursive: true });
      for (const dbEntry of fs.readdirSync(srcPath)) {
        if (dbEntry.endsWith(".sql") || dbEntry.endsWith(".png")) continue;
        fs.cpSync(path.join(srcPath, dbEntry), path.join(destPath, dbEntry), {
          recursive: true,
          dereference: true,
        });
      }
      continue;
    }

    fs.cpSync(srcPath, destPath, { recursive: true, dereference: true });
  }
}

module.exports = async function afterPack(context) {
  const backendSrcDir = path.join(
    context.packager.projectDir,
    "..",
    "rakonti-api"
  );
  const backendSrcNodeModules = path.join(backendSrcDir, "node_modules");

  // En Windows/Linux, electron-builder deja los recursos en
  // "<appOutDir>/resources/". En macOS van dentro del bundle .app:
  // "<appOutDir>/<NombreDeLaApp>.app/Contents/Resources/". En vez de asumir
  // el nombre exacto del .app (que depende de productName/appInfo y podría
  // no coincidir con mayúsculas/espacios si algo cambia), se busca el único
  // ".app" que exista dentro de appOutDir — así este script no se rompe si
  // el nombre de la app cambia en el futuro.
  let resourcesDir;
  if (context.electronPlatformName === "darwin") {
    const appBundle = fs
      .readdirSync(context.appOutDir)
      .find((name) => name.endsWith(".app"));
    if (!appBundle) {
      console.warn(
        `[afterPack] No se encontró ningún .app dentro de ${context.appOutDir}; no se puede ubicar Contents/Resources.`
      );
      return;
    }
    resourcesDir = path.join(context.appOutDir, appBundle, "Contents", "Resources");
  } else {
    resourcesDir = path.join(context.appOutDir, "resources");
  }

  const backendDestDir = path.join(resourcesDir, "backend");
  const backendDestNodeModules = path.join(backendDestDir, "node_modules");

  if (!fs.existsSync(backendSrcDir)) {
    console.warn(
      `[afterPack] No existe ${backendSrcDir}; ¿el checkout/carpeta de rakonti-api está en el lugar esperado (hermana de rakonti-sapp)?`
    );
    return;
  }

  if (!fs.existsSync(backendSrcNodeModules)) {
    console.warn(
      `[afterPack] No existe ${backendSrcNodeModules}; ¿corriste "npm install"/"npm ci" dentro de rakonti-api antes de empaquetar?`
    );
    return;
  }

  console.log(
    `[afterPack] Copiando código del backend:\n  desde ${backendSrcDir}\n  hacia ${backendDestDir}`
  );
  copyBackendSource(backendSrcDir, backendDestDir);

  console.log(
    `[afterPack] Copiando node_modules del backend:\n  desde ${backendSrcNodeModules}\n  hacia ${backendDestNodeModules}`
  );
  fs.cpSync(backendSrcNodeModules, backendDestNodeModules, {
    recursive: true,
    dereference: true,
  });

  console.log("[afterPack] Backend (código + node_modules) copiado correctamente.");
};
