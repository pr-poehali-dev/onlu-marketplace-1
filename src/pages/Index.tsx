import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

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
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favorites={favorites}
        setActiveView={setActiveView}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

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
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onProductClick={setSelectedProduct}
                    animationDelay={idx * 0.1}
                  />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                  onProductClick={setSelectedProduct}
                  animationDelay={idx * 0.05}
                />
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onProductClick={setSelectedProduct}
                  />
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

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
      />

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
