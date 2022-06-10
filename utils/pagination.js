const baseURL = process.env.BASE_URL
  ? `${process.env.BASE_URL}/members?page=`
  : 'http://localhost:3000/members?page='

module.exports = {
  /**
   * Calculate pagination
   *
   * @param {number} page number of the page
   * @param {number} total entity count
   * @returns {Object} pagination object
   * */
  calculatePagination: (page, total) => {
    const currentPage = parseInt(page, 10)
    const lastPage = Math.ceil(total / 10)
    const prevPage = currentPage === 1 ? undefined : currentPage - 1
    const nextPage = lastPage < currentPage + 1 ? undefined : currentPage + 1
    return {
      page: baseURL + currentPage,
      nextPage: nextPage ? baseURL + nextPage : undefined,
      prevPage: prevPage ? baseURL + prevPage : undefined,
      lastPage: baseURL + lastPage,
    }
  },
}
