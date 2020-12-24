export default function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//* Lam min du lieu cho 1 doument
export function getDataFromDoc(doc, excepts = []) {
    let data = doc.data();
    data.id = doc.id;
    return data;
}

//* Lam min du lieu cho 1 tap document
export function getDatafromDocs(docs, excepts = []) {
    return docs.map(function (doc) {
        return getDataFromDoc(doc, excepts);
    });
}

//* Luu thong tin nguoi dung hien tai truc tiep vao localStorage
export function saveCurrentUser(user) {
    localStorage.setItem("current-user", JSON.stringify(user));
}

//* Lay thong tin nguoi dung hien ai tu localStorage
export function getCurrentUser() {
    let result = localStorage.getItem("current-user");

    if (result) {
        return JSON.parse(result);
    }
    return null;
}
