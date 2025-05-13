export const getPrismaErrorResponse = (
    error: any
): [{ success: boolean; error: string }, { status: number }] => {
    if (error.name === "PrismaClientValidationError") {
        return [{ success: false, error: "Invalid Body" }, { status: 400 }];
    }

    if (error.name === "PrismaClientKnownRequestError") {
        switch (error.code) {
            case "P2002":
                return [
                    { success: false, error: "Duplicate Entry" },
                    { status: 409 },
                ];
            case "P2025":
                return [
                    { success: false, error: "Record Not Found" },
                    { status: 404 },
                ];
            case "P2003":
                return [
                    { success: false, error: "Foreign Key Constraint Failed" },
                    { status: 400 },
                ];
            default:
                return [
                    { success: false, error: "Bad Request" },
                    { status: 400 },
                ];
        }
    }

    if (error.name === "PrismaClientUnknownRequestError") {
        return [{ success: false, error: "Database Error" }, { status: 500 }];
    }

    return [{ success: false, error: "Unknown Error" }, { status: 500 }];
};

export const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    date.setHours(0, 0, 0, 0);
    return date;
};
