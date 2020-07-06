
export const getFormData = (e) => {
    const formData = new FormData(e.target);
    const data = Object.entries(formData);

    return data;
}