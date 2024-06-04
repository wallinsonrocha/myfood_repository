# MY FOOD

Aplicação feita por django onde visa testar algumas funcionalidades do DJANGO REST e JS.

## Nescessário
Para que aa plicação possa ser testada, é importante seguir as recomendações:

1 - Criação de Usuário com "role/grupo" sendo "cliente" ou "gerente";
2 - Alimentar o banco de dados Categoria e Comida

## Endpoints
### All
1 - /api/food/
2 - /api/category/
3 - /api/order/
4 - /api/cart/

### ID
1 - /api/food/1
2 - /api/category/1
3 - /api/order/1
4 - /api/cart/1

### Token
1 - /auth/token/ -> Para criar token (Autenticação)
2 - /auth/token/refresh/ -> Atualizar token de acesso
3 - /auth/token/verify/ -> Verificar token de acesso
4 - /logout/ 
