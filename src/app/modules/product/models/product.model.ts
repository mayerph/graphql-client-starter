import { Category } from '../../category/models/category.model';
import { Topic } from '../../topic/models/topic.model';
import { Image } from '../../image/models/image.model'

export class Product {
    id: any
    topic: Topic
    stock: number
    name: string
    description: string
    price: number
    categories: Category[]
    gender: 'MALE' | 'FEMALE' | 'UNISEX'
    img?: Image
}