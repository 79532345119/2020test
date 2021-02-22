import {Category, ICategory} from "./modules/category";
import { Game, IGame } from "./modules/game";
import { IMerchant, Merchant } from "./modules/merchant";

export class Controller {
    data: any
    categories: ICategory[] = []
    games: IGame[] = []

    constructor(data: any) {
        this.data = data
        this.setCategories()
       /*  this.setGames() */
        
    }

// вспомогательный метод. Создает коллекцию объектов игр
    setGames(): void {
        for (const game of this.data.games) {
            this.games.push(new Game(game))
        }
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
        let categoryId = this.getCategoryId(slug)
        for (const game of this.data.games) {
            let someGame = new Game(game)
                if( someGame.categoryID.includes(categoryId) ) {
                    requiredGames.push(someGame)
                }
        }
        return requiredGames
    }

    setCategories(): void {

        for (const category of this.data.categories) {
            this.categories.push(new Category(category))
        }
    }
    get allCategories(): ICategory[] {
        return this.categories
    }
}