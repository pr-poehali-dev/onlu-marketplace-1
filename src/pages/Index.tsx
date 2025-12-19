import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'favorites' | 'profile'>('home');

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Sparkles' },
    { id: 'electronics', name: 'Электроника', icon: 'Smartphone' },
    { id: 'phones', name: 'Телефоны', icon: 'Phone' },
    { id: 'cars', name: 'Автомобили', icon: 'Car' },
    { id: 'accessories', name: 'Аксессуары', icon: 'Watch' },
    { id: 'home', name: 'Для дома', icon: 'Home' },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      price: 89990,
      oldPrice: 139990,
      discount: 36,
      image: 'https://images.unsplash.com/photo-1696446702783-73e494e7c89c?w=400',
      category: 'phones',
      rating: 4.9,
      reviews: 2847,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      price: 79990,
      oldPrice: 124990,
      discount: 36,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      category: 'phones',
      rating: 4.8,
      reviews: 1523,
    },
    {
      id: 3,
      name: 'Toyota Camry 2023',
      price: 2499000,
      oldPrice: 3200000,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      category: 'cars',
      rating: 4.9,
      reviews: 456,
    },
    {
      id: 4,
      name: 'MacBook Pro 14" M3',
      price: 149990,
      oldPrice: 219990,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'electronics',
      rating: 5.0,
      reviews: 3421,
    },
    {
      id: 5,
      name: 'AirPods Pro 2',
      price: 16990,
      oldPrice: 24990,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
      category: 'accessories',
      rating: 4.7,
      reviews: 8934,
    },
    {
      id: 6,
      name: 'Tesla Model 3',
      price: 3299000,
      oldPrice: 4500000,
      discount: 27,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      category: 'cars',
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 7,
      name: 'Dyson V15 Detect',
      price: 42990,
      oldPrice: 64990,
      discount: 34,
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
      category: 'home',
      rating: 4.9,
      reviews: 1234,
    },
    {
      id: 8,
      name: 'PlayStation 5',
      price: 44990,
      oldPrice: 59990,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      category: 'electronics',
      rating: 4.9,
      reviews: 5621,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 py-8">
        {activeView === 'home' && (
          <>
            <section className="mb-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-secondary text-white">🔥 Суперцены</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Любой товар<br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    На 20-40% дешевле
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  От смартфонов до автомобилей — все по самым низким ценам на рынке
                </p>
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg"
                  onClick={() => setActiveView('catalog')}
                >
                  Смотреть каталог
                  <Icon name="ArrowRight" className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                  <Card
                    key={cat.id}
                    className="cursor-pointer hover-scale group"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveView('catalog');
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon name={cat.icon as any} className="text-primary" size={24} />
                      </div>
                      <p className="font-semibold text-sm">{cat.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">🔥 Горячие предложения</h3>
                <Button variant="ghost" onClick={() => setActiveView('catalog')}>
                  Все товары <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product, idx) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover-scale group cursor-pointer"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onClick={() => setSelectedProduct(product)}
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
                            toggleFavorite(product.id);
                          }}
                        >
                          <Icon
                            name="Heart"
                            size={18}
                            className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h4
                          className="font-semibold mb-2 line-clamp-2 cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
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
                          onClick={() => addToCart(product)}
                        >
                          <Icon name="ShoppingCart" className="mr-2" size={18} />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeView === 'catalog' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h2 className="text-3xl font-bold">Каталог товаров</h2>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                    <Icon name={cat.icon as any} size={16} />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover-scale group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onClick={() => setSelectedProduct(product)}
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
                          toggleFavorite(product.id);
                        }}
                      >
                        <Icon
                          name="Heart"
                          size={18}
                          className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}
                        />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h4
                        className="font-semibold mb-2 line-clamp-2 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
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
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'favorites' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h2 className="text-3xl font-bold">Избранное</h2>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Heart" className="mx-auto text-muted-foreground mb-4" size={64} />
                <p className="text-xl text-muted-foreground mb-4">Нет избранных товаров</p>
                <Button onClick={() => setActiveView('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover-scale group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onClick={() => setSelectedProduct(product)}
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
                            toggleFavorite(product.id);
                          }}
                        >
                          <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h4
                          className="font-semibold mb-2 line-clamp-2 cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
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
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" className="mr-2" size={18} />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'profile' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h2 className="text-3xl font-bold">Личный кабинет</h2>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Иван Иванов</h3>
                      <p className="text-muted-foreground">ivan@example.com</p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start">
                      <Icon name="Package" className="mr-2" />
                      Мои заказы
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="MapPin" className="mr-2" />
                      Адреса доставки
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="CreditCard" className="mr-2" />
                      Способы оплаты
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Settings" className="mr-2" />
                      Настройки
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Последние заказы</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold">Заказ #12345</p>
                        <p className="text-sm text-muted-foreground">15 декабря 2024</p>
                      </div>
                      <Badge>Доставлен</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold">Заказ #12344</p>
                        <p className="text-sm text-muted-foreground">10 декабря 2024</p>
                      </div>
                      <Badge variant="secondary">В пути</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={20} />
                    <span className="text-lg font-semibold">{selectedProduct.rating}</span>
                    <span className="text-muted-foreground">({selectedProduct.reviews} отзывов)</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-primary">
                        {selectedProduct.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Badge className="bg-secondary text-white">-{selectedProduct.discount}%</Badge>
                    </div>
                    <p className="text-lg text-muted-foreground line-through">
                      {selectedProduct.oldPrice.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700 font-semibold flex items-center gap-2">
                      <Icon name="TrendingDown" size={20} />
                      Цена ниже рынка на {selectedProduct.discount}%!
                    </p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <Button className="w-full h-12 text-lg" onClick={() => addToCart(selectedProduct)}>
                      <Icon name="ShoppingCart" className="mr-2" />
                      Добавить в корзину
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Icon
                        name="Heart"
                        className={favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500 mr-2' : 'mr-2'}
                      />
                      {favorites.includes(selectedProduct.id) ? 'В избранном' : 'В избранное'}
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
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-muted mt-16 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Возврат</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Электроника</li>
                <li>Телефоны</li>
                <li>Автомобили</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (800) 555-35-35</li>
                <li>support@only.ru</li>
                <li>Чат поддержки</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            © 2024 Onlу. Все цены ниже рынка на 20-40%
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
