export const todoValidation = {
    id: [
        {
            type: "required",
            message: "ID is required"
        }
    ],
    title: [
        {
            type: "required",
            message: "Title is required"
        }
    ],
    status: [
        {
            type: "required",
            message: "Status is required"
        }
    ],
};



export const facilityValidation = {
    name: [
        {
            type: "required",
            message: "Name is required"
        }
    ],
    facilty_type_id: [
        {
            type: "required",
            message: "Facility is required"
        }
    ],
    center_id: [
        {
            type: "required",
            message: "Center is required"
        }
    ],
    desc: [
        {
            type: "required",
            message: "Description is required"
        }
    ],
    status: [
        {
            type: "required",
            message: "Status is required"
        }
    ],
    candidate_capacity: [
        {
            type: "required",
            message: "Candidate capacity is required"
        }
    ]
};
