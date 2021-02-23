import {Category, ICategory} from "./modules/category";
import { Game, IGame } from "./modules/game";
import { IMerchant, Merchant } from "./modules/merchant";

export class Controller {
    data: any;
    games: IGame[] = [];
    games1: IGame[] = [];

    constructor(data: any) {
        this.data = data;
        this.setGames(); 
    };

// вспомогательный метод. Создает коллекцию объектов игр
    setGames(): IGame[] {
        const savedGames = JSON.parse(localStorage.getItem("games") || "[]") 
        if(savedGames.length>0) {
             for (const game of savedGames) {
                this.games.push(new Game(game.game));
            };
        } else {
            for (const game of this.data.games) {
                this.games.push(new Game(game));
            };
        }
        return this.games;
    };

// вспомогательный метод. Возвращает Merchant.ID по Alias
    getMerchantIdByAlias(alias: string): number {
        const entries: [string, IMerchant][] = Object.entries(this.data.merchants);
        let requiredId = null;
        entries.forEach(entry => {
            let someMerchant = new Merchant(entry[1]);
                if (someMerchant.Alias == alias) {
                    requiredId =  someMerchant.ID;
            };
        });
        return requiredId;
    };

// вспомогательный метод. Возвращает CategoryID по Slug
    getCategoryId(slug: string): number {
        let requiredCategoryId = null;       
        for (const category of this.data.categories) {
            let someCategory: ICategory = new Category(category);
            if(someCategory.Slug == slug) {
                requiredCategoryId = category.ID;
            };
        };
        return requiredCategoryId;
    };

// - getAllGames() - возвращает массив всех игр
    get getAllGames(): IGame[] {
        return this.games;
    };

// - getGameById() - возвращает игру по переданному ID
    getGameById(id: number): IGame {
        return this.games.filter(game => game.ID == id)[0];
    };

//- getGamesByProvider() - возвращает массив всех игр переданного провайдера (alias)
    getGamesByProvider(alias: string): IGame[] {
        let merchantID = this.getMerchantIdByAlias(alias);
        return this.games.filter(game => game.MerchantID == merchantID);
    };

//- getGamesByCategory() - возвращает массив всех игр переданной категории (slug)
    getGamesByCategory(slug: string): IGame[] {
        let categoryId = ""+this.getCategoryId(slug);
        return this.games.filter(game => game.CategoryID.includes(categoryId));
    };

//- filterGamesBy() - возвращает массив всех игр по переданным параметрам: провайдер, категория
    filterGamesBy(alias: string, slug: string): IGame[] {
        let categoryId = ""+this.getCategoryId(slug);
        let merchantID = this.getMerchantIdByAlias(alias);
        return this.games.filter(game => game.CategoryID.includes(categoryId) && game.MerchantID == merchantID);
    };

//- searchGamesByName() - возвращает массив игр, содержащих переданную строку в названии игры
    searchGamesByName(str: string): IGame[] {
        return this.games.filter(game => (game.Name.en.toUpperCase().includes(str.toUpperCase())));
    };

/* - removeGamesFromLibruary() - удаление игр вообще из списка по заранее заданному
фильтру. Фильтр включает массив из ID провайдера или ID категории или ID игры, которые надо
удалить. */
    removeGamesFromLibruary(params:any): IGame[] {
        const merchantId: number = params[0] || 0;
        const categoryId: string = params[1] || ""; 
        const gameId: number = params[2] || 0;
        this.games =  this.games.filter(game=> (game.MerchantID != merchantId && !game.CategoryID.includes(categoryId) && game.ID != gameId ));
        localStorage.setItem("games", JSON.stringify(this.games))
        return this.games
    };
};