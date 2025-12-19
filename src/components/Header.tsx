import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';

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

interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: number[];
  setActiveView: (view: 'home' | 'catalog' | 'favorites' | 'profile') => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
}

const Header = ({
  searchQuery,
  setSearchQuery,
  favorites,
  setActiveView,
  cart,
  cartCount,
  cartTotal,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Onlу
            </h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск товаров, брендов, категорий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setActiveView('favorites')}
            >
              <Icon name="Heart" size={24} className={favorites.length > 0 ? 'fill-red-500 text-red-500' : ''} />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={24} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" className="mx-auto text-muted-foreground mb-4" size={48} />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{item.name}</h4>
                                  <p className="text-lg font-bold text-primary mt-1">
                                    {item.price.toLocaleString('ru-RU')} ₽
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Icon name="Minus" size={16} />
                                    </Button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Icon name="Plus" size={16} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 ml-auto text-destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">
                            {cartTotal.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Button className="w-full h-12 text-lg" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('profile')}
            >
              <Icon name="User" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
