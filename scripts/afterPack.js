// Hook afterPack de electron-builder.
//
// Por qué existe: electron-builder respeta el .gitignore de la carpeta
// "from" para CUALQUIER entrada de extraResources, incluida una que apunte
// directo a "../rakonti-api/node_modules". Como rakonti-api/.gitignore
// ignora "node_modules/", esa carpeta nunca se copiaba al paquete final,
// aunque el filtro de extraResources la incluyera explícitamente — el
// backend empaquetado quedaba sin sus dependencias (express, pg, bcrypt, etc.)
// y por eso require() fallaba en silencio al abrir la app instalada.
//
// Solución: copiar node_modules del backend "a mano" con fs.cpSync, DESPUÉS
// de que electron-builder ya armó resources/backend con el resto del código
// (vía extraResources normal). fs.cpSync no sabe nada de git ni de filtros
// de electron-builder, así que copia todo tal cual.
const fs = require("fs");
const path = require("path");

module.exports = async function afterPack(context) {
  const backendSrcNodeModules = path.join(
    context.packager.projectDir,
    "..",
    "rakonti-api",
    "node_modules"
  );

  const backendDestDir = path.join(
    context.appOutDir,
    "resources",
    "backend"
  );
  const backendDestNodeModules = path.join(backendDestDir, "node_modules");

  if (!fs.existsSync(backendSrcNodeModules)) {
    console.warn(
      `[afterPack] No existe ${backendSrcNodeModules}; ¿corriste "npm install" dentro de rakonti-api?`
    );
    return;
  }

  if (!fs.existsSync(backendDestDir)) {
    console.warn(
      `[afterPack] No existe ${backendDestDir} (extraResources del backend no se copió); revisa la config de "build.extraResources".`
    );
    return;
  }

  console.log(
    `[afterPack] Copiando node_modules del backend:\n  desde ${backendSrcNodeModules}\n  hacia ${backendDestNodeModules}`
  );

  fs.cpSync(backendSrcNodeModules, backendDestNodeModules, {
    recursive: true,
    dereference: true,
  });

  console.log("[afterPack] node_modules del backend copiado correctamente.");
};
