import { Controller } from "./controller"

const getJson = (): void => {
    fetch('games.json')
        .then(response => {
            return response.json()
                .then(data => {

                    const controller = new Controller(data.data)

                // - getAllGames() - возвращает массив всех игр
                    console.log(controller.getAllGames)

                //- getGameById() - возвращает игру по переданному ID
                    console.log(controller.getGameById(1766765)) // 1766765  1531775

                    console.log(controller.getMerchantIdByAlias("Microgaming")) // IronDog  AsiaLiveTech AsiaGaming
                   
                //- getGamesByProvider() - возвращает массив всех игр переданного провайдера (alias)
                    console.log(controller.getGamesByProvider("Microgaming"))

                    console.log(controller.getCategoryId("other"))

                // - getGamesByCategory() - возвращает массив всех игр переданной категории (slug)
                    console.log(controller.getGamesByCategory("other"))

                })
        })
}
getJson()