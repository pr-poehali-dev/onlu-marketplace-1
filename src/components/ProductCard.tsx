import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  animationDelay?: number;
}

const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
  animationDelay = 0,
}: ProductCardProps) => {
  return (
    <Card
      className="overflow-hidden hover-scale group cursor-pointer"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            onClick={() => onProductClick(product)}
          />
          <Badge className="absolute top-2 left-2 bg-secondary text-white">
            -{product.discount}%
          </Badge>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
          >
            <Icon
              name="Heart"
              size={18}
              className={isFavorite ? 'fill-red-500 text-red-500' : ''}
            />
          </Button>
        </div>
        <div className="p-4">
          <h4
            className="font-semibold mb-2 line-clamp-2 cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            {product.name}
          </h4>
          <div className="flex items-center gap-1 mb-2">
            <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <div className="text-sm text-muted-foreground line-through mb-3">
            {product.oldPrice.toLocaleString('ru-RU')} ₽
          </div>
          <Button
            className="w-full"
            onClick={() => onAddToCart(product)}
          >
            <Icon name="ShoppingCart" className="mr-2" size={18} />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
