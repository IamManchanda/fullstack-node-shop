/* Controllers => Error */

const errorPageController = (request, response, next) => {
  response.status(404).render('error', { documentTitle: `Error 404 - Best Shop` });
};

module.exports = { errorPageController };
