export interface ICategory {
    CSort: number,
    CSubSort: number,
    ID: number,
    Name: {
        b5: string,
        cn: string,
        de: string,
        en: string,
        ja: string,
        ko: string,
        pt: string,
        ru: string,
        sv: string,
        uk: string,
        zh: string,
    },
    Slug: string,
    Tags: string[],
    Trans: {
        b5: string,
        cn: string,
        de: string,
        en: string,
        ja: string,
        ko: string,
        pt: string,
        ru: string,
        sv: string,
        uk: string,
        zh: string,
    },
    menuId: string
};


export class Category {
    category: ICategory;

    constructor(category: ICategory) {
        this.category = category;
    };

    get CSort(): number {
        return this.category.CSort;
    };
    get CSubSort(): number {
        return this.category.CSubSort;
    };
    get ID(): number {
        return this.category.ID;
    };
    get Name(): any {
        return this.category.Name;
    };
    get Slug(): string {
        return this.category.Slug;
    };
    get Tags(): string[] {
        return this.category.Tags;
    };
    get Trans(): any {
        return this.category.Trans;
    };
    get menuId(): string {
        return this.category.menuId
    }
}