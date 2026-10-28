import template from './embed.json';

export async function GET({ params }) {
  const username = params.username || '';

  let processedString = JSON.stringify(template);
  processedString = processedString
    .replaceAll('{{username}}', username)
    //.replaceAll('{{uuid}}', data.player._id);

  const processedTemplate = JSON.parse(processedString);

  return Response.json(processedTemplate);
}
