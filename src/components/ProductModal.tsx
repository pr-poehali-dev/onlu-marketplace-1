import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} отзывов)</span>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                <Badge className="bg-secondary text-white">-{product.discount}%</Badge>
              </div>
              <p className="text-lg text-muted-foreground line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 font-semibold flex items-center gap-2">
                <Icon name="TrendingDown" size={20} />
                Цена ниже рынка на {product.discount}%!
              </p>
            </div>
            <div className="space-y-3 mb-6">
              <Button className="w-full h-12 text-lg" onClick={() => onAddToCart(product)}>
                <Icon name="ShoppingCart" className="mr-2" />
                Добавить в корзину
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => onToggleFavorite(product.id)}
              >
                <Icon
                  name="Heart"
                  className={isFavorite ? 'fill-red-500 text-red-500 mr-2' : 'mr-2'}
                />
                {isFavorite ? 'В избранном' : 'В избранное'}
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={16} className="text-primary" />
                <span>Бесплатная доставка от 2000 ₽</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-primary" />
                <span>Доставка 1-2 дня</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>Гарантия 12 месяцев</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
