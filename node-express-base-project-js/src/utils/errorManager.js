const manageError = obError => {
	// Catch type error
	return {
		message: obError.message
	};
};
export { manageError };
