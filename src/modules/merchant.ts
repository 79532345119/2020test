export interface IMerchant {
    ID: number,
    Name: string,
    IDParent: number,
    Alias: string,
    Image: string,
    menuId: string
};

export class Merchant {
    merchant: IMerchant;

    constructor(merchant: IMerchant) {
        this.merchant = merchant;
    }

    get ID(): number {
        return this.merchant.ID
    }
    get Alias(): string {
        return this.merchant.Alias
    }
}