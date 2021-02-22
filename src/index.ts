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

                // - filterGamesBy() - возвращает массив всех игр по переданным параметрам: провайдер, категория
                    console.log(controller.filterGamesBy("Microgaming", "other"))

                // - searchGamesByName() - возвращает массив игр, содержащих переданную строку в названии игры
                    console.log(controller.searchGamesByName("John"));

                /* - removeGamesFromLibruary() - удаление игр вообще из списка по заранее заданному
                        фильтру. Фильтр включает массив из ID провайдера или ID категории или ID игры, которые надо
                        удалить. */
                    console.log(controller.removeGamesFromLibruary(997,"22")) // 1849422 // 1849419

                })
        })
}
getJson()