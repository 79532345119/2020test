import { Controller } from "./controller";

const getJson = (): void => {
    fetch('games.json')
        .then(response => {
            return response.json()
                .then(data => {

                    const controller = new Controller(data.data);

                // - getAllGames() - возвращает массив всех игр
                    console.log(controller.getAllGames);

                //- getGameById() - возвращает игру по переданному ID
                    console.log(controller.getGameById(1846651)); // 1766765  1531775 1846651
                   
                //- getGamesByProvider() - возвращает массив всех игр переданного провайдера (alias)
                    console.log(controller.getGamesByProvider("Microgaming")); 

                // - getGamesByCategory() - возвращает массив всех игр переданной категории (slug)
                    console.log(controller.getGamesByCategory("other"));

                // - filterGamesBy() - возвращает массив всех игр по переданным параметрам: провайдер, категория
                    console.log(controller.filterGamesBy("Microgaming", "other"));

                // - searchGamesByName() - возвращает массив игр, содержащих переданную строку в названии игры
                    console.log(controller.searchGamesByName("Gold"));

                /* - removeGamesFromLibruary() - удаление игр вообще из списка по заранее заданному
                        фильтру. Фильтр включает массив из ID провайдера или ID категории или ID игры, которые надо
                        удалить. */
                    console.log(controller.removeGamesFromLibruary([,"16"]));// 1849422 1849419  [997,"16",1829536]

                });
        });
};



getJson();