/* Controllers => Error */

const errorPageController = (request, response) => {
  response.status(404).render('error', { documentTitle: `Error 404 - Best Shop` });
};

module.exports = { errorPageController };
