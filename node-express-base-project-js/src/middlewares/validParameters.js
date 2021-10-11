export default (fields, method) => {
    return (req, res, next) => {

        let parameters;
        switch (method) {
            case "GET":
                parameters = req.query;
                console.log('req.query', req.query)
                break;

            case "POST":
            case "DELETE":
            case "PUT":
                parameters = req.body;
                break;

            default:
                parameters = ['method'];
                break;
        }

        for (const field of fields) {
            if (!parameters[field]) { // Field isn't present, end request
                return res
                    .status(400)
                    .json({
                        message: `${field} is missing`
                    });
            }
        }

        next(); // All fields are present, proceed

    };
}