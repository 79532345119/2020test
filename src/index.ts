const getJson = (): void => {
    fetch('games.json')
        .then(response => {
            return response.json()
                .then(data => {

                    console.log(data)

                })
        })
}
getJson()