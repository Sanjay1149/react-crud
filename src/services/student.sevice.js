import firebase from "../firebase";

const db = firebase.ref("/admissions");

class StudentDataService {
    getAll() {
        return db;
    }

    create(tutorial) {
        return db.push(tutorial);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new StudentDataService();
