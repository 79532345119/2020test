import {Category, ICategory} from "./modules/category";
import { Game, IGame } from "./modules/game";
import { IMerchant, Merchant } from "./modules/merchant";

export class Controller {
    data: any
    categories: ICategory[] = []
    games: IGame[] = []

    constructor(data: any) {
        this.data = data
        this.setGames()      
    }

// вспомогательный метод. Создает коллекцию объектов игр
    setGames(): IGame[] {
        for (const game of this.data.games) {
            this.games.push(new Game(game))
        }
        return this.games
    }

// вспомогательный метод. Возвращает Merchant.ID по Alias
    getMerchantIdByAlias(alias: string): number {
        const entries: [string, IMerchant][] = Object.entries(this.data.merchants);
        let requiredId = null;
        entries.forEach(entry => {
            let someMerchant = new Merchant(entry[1])
                if (someMerchant.Alias == alias) {
                    requiredId =  someMerchant.ID;
            }
        })
        return requiredId
    }

// вспомогательный метод. Возвращает CategoryID по Slug
    getCategoryId(slug: string): number {
        let requiredCategoryId = null;
        for (const category of this.data.categories) {
            if(category.Slug == slug) {
                requiredCategoryId = category.ID
            }
        }
        return requiredCategoryId
    }

// - getAllGames() - возвращает массив всех игр
    get getAllGames(): IGame[] {
        this.setGames()
        return this.games
    }

// - getGameById() - возвращает игру по переданному ID
    getGameById(id: number): IGame {
        for (const game of this.data.games) {
            let someGame = new Game(game)
                if (someGame.ID == id) {
                    return someGame
            }
        }
    }

//- getGamesByProvider() - возвращает массив всех игр переданного провайдера (alias)
    getGamesByProvider(alias: string): IGame[] {
        let requiredGames: IGame[] = []
        let merchantID = this.getMerchantIdByAlias(alias)
        for (const game of this.data.games) {
            let someGame = new Game(game)
                if (someGame.MerchantID == merchantID) {
                    requiredGames.push(someGame)
                }
        }
        return requiredGames
    }

//- getGamesByCategory() - возвращает массив всех игр переданной категории (slug)
    getGamesByCategory(slug: string): IGame[] {
        let requiredGames: IGame[] = []
        let categoryId = ""+this.getCategoryId(slug)
        for (const game of this.data.games) {
            let someGame = new Game(game)
                if( someGame.CategoryID.includes(categoryId) ) {
                    requiredGames.push(someGame)
                }
        }
        return requiredGames
    }

//- filterGamesBy() - возвращает массив всех игр по переданным параметрам: провайдер, категория
    filterGamesBy(alias: string, slug: string): IGame[] {
        let requiredGames: IGame[] = []
        let categoryId = ""+this.getCategoryId(slug)
        let merchantID = this.getMerchantIdByAlias(alias)
        for (const game of this.data.games) {
            let someGame = new Game(game)
                if( someGame.CategoryID.includes(categoryId) && someGame.MerchantID == merchantID) {
                    requiredGames.push(someGame)
                }
        }
        return requiredGames
    }

//- searchGamesByName() - возвращает массив игр, содержащих переданную строку в названии игры
    searchGamesByName(str: string): IGame[] {
        return this.games.filter(game => (game.Name.en.toUpperCase().includes(str.toUpperCase())))
    }

/* - removeGamesFromLibruary() - удаление игр вообще из списка по заранее заданному
фильтру. Фильтр включает массив из ID провайдера или ID категории или ID игры, которые надо
удалить. */
    removeGamesFromLibruary(merchantId: number = 0, categoryId: string = "", gameId: number = 0): IGame[] {
        return this.games.filter(game=> (game.MerchantID != merchantId && !game.CategoryID.includes(categoryId) && game.ID != gameId ) )
    }
}