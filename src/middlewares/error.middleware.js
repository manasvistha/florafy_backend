// const errorMiddleware = (error, request, response, next) => {
//   const statusCode = response.statusCode === 200 ? 500 : response.statusCode;

//   response.status(statusCode).json({
//     message: error.message || 'Internal Server Error',
//   });
// };

// export default errorMiddleware;