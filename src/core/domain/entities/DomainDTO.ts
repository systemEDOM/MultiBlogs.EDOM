export class DomainDTO {
    public id: number;
    public name: string;
    public slug: string;
    public url: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: number, name: string, slug: string, url: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
