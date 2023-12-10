const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//   } catch (error) {
//     res.stats(error.code || 500).json({
//       success: false,
//       messgae: error.messgae,
//     });
//   }
// };
export { asyncHandler };
