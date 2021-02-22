export interface IGame {
    AR: string,
    CategoryID: string[],
    ID: number,
    IDCountryRestriction: number,
    Image: string,
    LaunchCode: string,
    MerchantID: number,
    Name: {
        en: string,
        split():[]
    },
    Sort: number,
    SortPerCategory: any,
    SubMerchantID: any,
    Url: string,
    hasDemo: number,
    isRestricted: boolean,
};

export class Game {
    game: IGame;

    constructor(game: IGame) {
        this.game = game;
    };

    get AR(): string {
        return this.game.AR;
    };
    get CategoryID(): string[] {
        return this.game.CategoryID;
    };
    get ID(): number {
        return this.game.ID;
    };
    get IDCountryRestriction(): number {
        return this.game.IDCountryRestriction;
    };
    get Image(): string {
        return this.game.Image;
    };
    get LaunchCode(): string {
        return this.game.LaunchCode;
    };
    get MerchantID(): number {
        return this.game.MerchantID;
    };
    get Name(): any {
        return this.game.Name;
    };
    get Sort(): number {
        return this.game.Sort;
    };
    get SortPerCategory(): any {
        return this.game.SortPerCategory;
    };
    get SubMerchantID(): any {
        return this.game.SubMerchantID;
    };
    get Url(): string {
        return this.game.Url;
    };
    get hasDemo(): number {
        return this.game.hasDemo;
    };
    get isRestricted(): boolean {
        return this.game.isRestricted;
    };
};