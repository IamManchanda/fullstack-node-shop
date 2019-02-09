/* Controllers => Error */

const errorPageController = (request, response) => {
  response.status(404).render('error', { documentTitle: `Error 404 - Harry's Shop` });
};

module.exports = { errorPageController };
