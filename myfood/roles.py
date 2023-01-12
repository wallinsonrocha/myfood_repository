from rolepermissions.roles import AbstractUserRole


class Gerente(AbstractUserRole):
    available_permissions = {'dashboard_adm': True, 'order_controller': True,}

class Client(AbstractUserRole):
    available_permissions = {'buy': True,}