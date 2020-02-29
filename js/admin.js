const vm = new Vue({
    el: "#app",
    data: {
        transactions: []
    },
    mounted() {
        db.collection('transactions').orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let changes = querySnapshot.docChanges();
            console.log(changes);
            changes.forEach(change => {
                if (change.type == "added") {
                    this.transactions.push(change.doc.data())
                }
            });
        })
    }
});