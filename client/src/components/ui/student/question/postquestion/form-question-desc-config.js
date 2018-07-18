/**
 * Created by bhuang on 2/26/18.
 */

export const getQuestionTypeButtons = (formQuestion, callback) => {
    return ([
        {
            form: formQuestion,
            label: "Paid Question",
            name: "qtype",
            id: "first",
            value: "paid",
            onClick: callback
        },
        {
            form: formQuestion,
            label: "Free Question",
            name: "qtype",
            id: "second",
            value: "free",
            onClick: callback
        }
    ]);
};

export const getThumbnailRadioButtons = (formQuestion, callback) => {
    return ([
        {
            form: formQuestion,
            label: "Add a thumbnail image (option)",
            name:"thumbnail",
            id:"thumbnail-first",
            value:"custom",
            onClick: callback},
        {
            form: formQuestion,
            label: "Use default image",
            name:"thumbnail",
            id:"thumbnail-second",
            value:"default",
            onClick: callback}
    ]);
};

export const getCategoryItems = (form, callback) => {
    return ([
        {
            form: form,
            name: "categories",
            label: "All Industries",
            value: "All Industries",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Architecture",
            value: "Architecture",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Art Direction",
            value: "Art Direction",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Branding",
            value: "Branding",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Fashion",
            value: "Fashion",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Graphic Design",
            value: "Graphic Design",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Illustration",
            value: "Illustration",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Industrial Design",
            value: "Industrial Design",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Interaction Design",
            value: "Interaction Design",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Motion Graphics",
            value: "Motion Graphics",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Photography",
            value: "Photography",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "UI/UX",
            value: "UI/UX",
            setCategories: callback
        },
        {
            form: form,
            name: "categories",
            label: "Web Design",
            value: "Web Design",
            setCategories: callback
        }
    ]);
};
