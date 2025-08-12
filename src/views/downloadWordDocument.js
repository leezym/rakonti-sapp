import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

export default function downloadWordDocument(tituloHistoria, stages, stepContents) {
  // Construimos el arreglo de párrafos para la sección principal
  const children = [];

  // Agregamos título
  children.push(
    new Paragraph({
      text: tituloHistoria,
      heading: "Title",
      spacing: { after: 300 },
    })
  );

  // Agregamos cada paso
  stages.forEach((stage) => {
    const contenidoHtml = stepContents[stage.id_paso_estructura] || "";

    const parser = new DOMParser();
    const docHtml = parser.parseFromString(contenidoHtml, "text/html");
    const textoPlano = docHtml.body.textContent || "";

    children.push(
      new Paragraph({
        text: stage.nombre_paso,
        heading: "Heading1",
        spacing: { before: 300, after: 100 },
      }),
      new Paragraph({
        text: textoPlano,
        spacing: { after: 300 },
      })
    );
  });

  // Crear documento con las secciones (un arreglo con un solo objeto con children)
  const doc = new Document({
    creator: "Rakonti",
    title: tituloHistoria,
    description: `Documento de la historia ${tituloHistoria}`,
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${tituloHistoria}.docx`);
  });
}