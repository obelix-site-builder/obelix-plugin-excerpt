const excerptHtml = require("excerpt-html");
const path = require("path");

function isTemplate(node) {
  return (
    path.extname(node.name) == ".hbs" ||
    path.extname(node.name) == ".handlebars"
  );
}

const layoutHook = (config) => (siteData) => {
  siteData.routes.forEach((node) => {
    if (node.type == "page" && !isTemplate(node)) {
      const excerpt = excerptHtml(node.content, config);
      node.metadata.excerpt = excerpt;
    }
  });
  return siteData;
};

module.exports = (config) => {
  return {
    hooks: {
      layout: layoutHook(config),
    },
  };
};
