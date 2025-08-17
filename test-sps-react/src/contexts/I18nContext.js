import React, { createContext, useContext, useState, useEffect } from "react";

// Translation files
const translations = {
  en: {
    // Navigation
    "nav.users": "Users",
    "nav.home": "Home",
    "nav.signOut": "Sign Out",

    // Users page
    "users.title": "Users Management",
    "users.createNew": "Create New User",
    "users.noUsers": "No users found.",
    "users.loading": "Loading users...",
    "users.confirmDelete": 'Are you sure you want to delete user "{userName}"?',
    "users.deleteSuccess": "User deleted successfully",

    // Table headers
    "table.id": "ID",
    "table.name": "Name",
    "table.email": "Email",
    "table.type": "Type",
    "table.createdAt": "Created At",
    "table.actions": "Actions",

    // Actions
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.create": "Create",
    "action.update": "Update",

    // Forms
    "form.name": "Name",
    "form.email": "Email",
    "form.password": "Password",
    "form.type": "Type",
    "form.required": "This field is required",
    "form.invalidEmail": "Please enter a valid email",
    "form.emailRequired": "Email is required",
    "form.passwordRequired": "Password is required",
    "form.passwordMinLength": "Password must be at least 6 characters",
    "form.nameRequired": "Name is required",
    "form.nameMinLength": "Name must be at least 2 characters",
    "form.nameMaxLength": "Name must be less than 50 characters",
    "form.userTypeRequired": "User type is required",
    "form.passwordOptional": "(leave empty to keep current password)",
    "form.userType": "User Type",
    "form.editUser": "Edit User",
    "form.createUser": "Create User",
    "form.updateUser": "Update User",
    "form.updating": "Updating...",
    "form.creating": "Creating...",

    // User types
    "userType.admin": "Admin",
    "userType.standard": "User",

    // Messages
    "message.userCreated": "User created successfully",
    "message.userUpdated": "User updated successfully",
    "message.error": "An error occurred",

    // Auth
    "auth.signIn": "Sign In",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.invalidCredentials": "Invalid credentials",
    "auth.loginSuccess": "Login successful!",
    "auth.signingIn": "Signing in...",

    // App
    "app.title": "SPS User Management",

    // User
    "user.loadingSingle": "Loading user...",
    "user.notFound": "User not found",

    // Home
    "home.title": "Welcome to SPS User Management System",
    "home.greeting": "Hello, {name}! You are logged in as a {role} user.",
    "home.description":
      "This is a secure user management system where you can manage users, view user information, and perform administrative tasks based on your permissions.",
    "home.quickActions": "Quick Actions",
    "home.viewUsers": "View All Users",
    "home.yourRole": "Your Role",
    "home.adminPermissions": "Full access to all features",
    "home.userPermissions": "View access to user information",
    "home.accountInfo": "Account Info",
    "home.registeredEmail": "Your registered email address",
    "home.systemStatusTitle": "System Status",
    "home.systemStatus": "All systems operational",
    "home.online": "Online",
    "home.featuresTitle": "Features Available",
    "home.feature.jwtAuth": "Secure JWT-based authentication",
    "home.feature.viewUsers": "View user listings and details",
    "home.feature.createUsers": "Create new users",
    "home.feature.editUsers": "Edit existing users",
    "home.feature.deleteUsers": "Delete users",
    "home.feature.roleAccess": "Role-based access control",
    "home.feature.responsive": "Responsive design",
    "home.feature.notifications": "Real-time notifications",

    // Errors
    "error.fetchUsers": "Failed to fetch users",
    "error.fetchUser": "Failed to fetch user",
    "error.createUser": "Failed to create user",
    "error.updateUser": "Failed to update user",
    "error.deleteUser": "Failed to delete user",
    "error.loginFailed": "Login failed. Please try again.",
    "error.unexpected": "An unexpected error occurred",

    // General
    "general.welcome": "Welcome",
    "general.language": "Language",
  },
  pt: {
    // Navigation
    "nav.users": "Usuários",
    "nav.home": "Início",
    "nav.signOut": "Sair",

    // Users page
    "users.title": "Gerenciamento de Usuários",
    "users.createNew": "Criar Novo Usuário",
    "users.noUsers": "Nenhum usuário encontrado.",
    "users.loading": "Carregando usuários...",
    "users.confirmDelete":
      'Tem certeza que deseja excluir o usuário "{userName}"?',
    "users.deleteSuccess": "Usuário excluído com sucesso",

    // Table headers
    "table.id": "ID",
    "table.name": "Nome",
    "table.email": "Email",
    "table.type": "Tipo",
    "table.createdAt": "Criado em",
    "table.actions": "Ações",

    // Actions
    "action.edit": "Editar",
    "action.delete": "Excluir",
    "action.save": "Salvar",
    "action.cancel": "Cancelar",
    "action.create": "Criar",
    "action.update": "Atualizar",

    // Forms
    "form.name": "Nome",
    "form.email": "Email",
    "form.password": "Senha",
    "form.type": "Tipo",
    "form.required": "Este campo é obrigatório",
    "form.invalidEmail": "Por favor, insira um email válido",
    "form.emailRequired": "Email é obrigatório",
    "form.passwordRequired": "Senha é obrigatória",
    "form.passwordMinLength": "A senha deve ter pelo menos 6 caracteres",
    "form.nameRequired": "Nome é obrigatório",
    "form.nameMinLength": "O nome deve ter pelo menos 2 caracteres",
    "form.nameMaxLength": "O nome deve ter menos de 50 caracteres",
    "form.userTypeRequired": "Tipo de usuário é obrigatório",
    "form.passwordOptional": "(deixe vazio para manter a senha atual)",
    "form.userType": "Tipo de Usuário",
    "form.editUser": "Editar Usuário",
    "form.createUser": "Criar Usuário",
    "form.updateUser": "Atualizar Usuário",
    "form.updating": "Atualizando...",
    "form.creating": "Criando...",

    // User types
    "userType.admin": "Administrador",
    "userType.standard": "Usuário",

    // Messages
    "message.userCreated": "Usuário criado com sucesso",
    "message.userUpdated": "Usuário atualizado com sucesso",
    "message.error": "Ocorreu um erro",

    // Auth
    "auth.signIn": "Entrar",
    "auth.email": "Email",
    "auth.password": "Senha",
    "auth.invalidCredentials": "Credenciais inválidas",
    "auth.loginSuccess": "Login realizado com sucesso!",
    "auth.signingIn": "Entrando...",

    // App
    "app.title": "Gerenciamento de Usuários SPS",

    // User
    "user.loadingSingle": "Carregando usuário...",
    "user.notFound": "Usuário não encontrado",

    // Home
    "home.title": "Bem-vindo ao Sistema de Gerenciamento de Usuários SPS",
    "home.greeting": "Olá, {name}! Você está logado como {role}.",
    "home.description":
      "Este é um sistema seguro de gerenciamento de usuários onde você pode gerenciar usuários, visualizar informações de usuários e executar tarefas administrativas com base em suas permissões.",
    "home.quickActions": "Ações Rápidas",
    "home.viewUsers": "Ver Todos os Usuários",
    "home.yourRole": "Seu Papel",
    "home.adminPermissions": "Acesso completo a todos os recursos",
    "home.userPermissions": "Acesso de visualização às informações do usuário",
    "home.accountInfo": "Informações da Conta",
    "home.registeredEmail": "Seu endereço de email registrado",
    "home.systemStatusTitle": "Status do Sistema",
    "home.systemStatus": "Todos os sistemas operacionais",
    "home.online": "Online",
    "home.featuresTitle": "Recursos Disponíveis",
    "home.feature.jwtAuth": "Autenticação segura baseada em JWT",
    "home.feature.viewUsers": "Visualizar listagens e detalhes de usuários",
    "home.feature.createUsers": "Criar novos usuários",
    "home.feature.editUsers": "Editar usuários existentes",
    "home.feature.deleteUsers": "Excluir usuários",
    "home.feature.roleAccess": "Controle de acesso baseado em função",
    "home.feature.responsive": "Design responsivo",
    "home.feature.notifications": "Notificações em tempo real",

    // Errors
    "error.fetchUsers": "Falha ao buscar usuários",
    "error.fetchUser": "Falha ao buscar usuário",
    "error.createUser": "Falha ao criar usuário",
    "error.updateUser": "Falha ao atualizar usuário",
    "error.deleteUser": "Falha ao excluir usuário",
    "error.loginFailed": "Falha no login. Tente novamente.",
    "error.unexpected": "Ocorreu um erro inesperado",

    // General
    "general.welcome": "Bem-vindo",
    "general.language": "Idioma",
  },
  es: {
    // Navigation
    "nav.users": "Usuarios",
    "nav.home": "Inicio",
    "nav.signOut": "Cerrar Sesión",

    // Users page
    "users.title": "Gestión de Usuarios",
    "users.createNew": "Crear Nuevo Usuario",
    "users.noUsers": "No se encontraron usuarios.",
    "users.loading": "Cargando usuarios...",
    "users.confirmDelete":
      '¿Estás seguro de que quieres eliminar al usuario "{userName}"?',
    "users.deleteSuccess": "Usuario eliminado exitosamente",

    // Table headers
    "table.id": "ID",
    "table.name": "Nombre",
    "table.email": "Email",
    "table.type": "Tipo",
    "table.createdAt": "Creado en",
    "table.actions": "Acciones",

    // Actions
    "action.edit": "Editar",
    "action.delete": "Eliminar",
    "action.save": "Guardar",
    "action.cancel": "Cancelar",
    "action.create": "Crear",
    "action.update": "Actualizar",

    // Forms
    "form.name": "Nombre",
    "form.email": "Email",
    "form.password": "Contraseña",
    "form.type": "Tipo",
    "form.required": "Este campo es obligatorio",
    "form.invalidEmail": "Por favor, ingresa un email válido",
    "form.emailRequired": "El email es obligatorio",
    "form.passwordRequired": "La contraseña es obligatoria",
    "form.passwordMinLength": "La contraseña debe tener al menos 6 caracteres",
    "form.nameRequired": "El nombre es obligatorio",
    "form.nameMinLength": "El nombre debe tener al menos 2 caracteres",
    "form.nameMaxLength": "El nombre debe tener menos de 50 caracteres",
    "form.userTypeRequired": "El tipo de usuario es obligatorio",
    "form.passwordOptional": "(dejar vacío para mantener la contraseña actual)",
    "form.userType": "Tipo de Usuario",
    "form.editUser": "Editar Usuario",
    "form.createUser": "Crear Usuario",
    "form.updateUser": "Actualizar Usuario",
    "form.updating": "Actualizando...",
    "form.creating": "Creando...",

    // User types
    "userType.admin": "Administrador",
    "userType.standard": "Usuario",

    // Messages
    "message.userCreated": "Usuario creado exitosamente",
    "message.userUpdated": "Usuario actualizado exitosamente",
    "message.error": "Ocurrió un error",

    // Auth
    "auth.signIn": "Iniciar Sesión",
    "auth.email": "Email",
    "auth.password": "Contraseña",
    "auth.invalidCredentials": "Credenciales inválidas",
    "auth.loginSuccess": "¡Inicio de sesión exitoso!",
    "auth.signingIn": "Iniciando sesión...",

    // App
    "app.title": "Gestión de Usuarios SPS",

    // User
    "user.loadingSingle": "Cargando usuario...",
    "user.notFound": "Usuario no encontrado",

    // Home
    "home.title": "Bienvenido al Sistema de Gestión de Usuarios SPS",
    "home.greeting": "¡Hola, {name}! Estás conectado como usuario {role}.",
    "home.description":
      "Este es un sistema seguro de gestión de usuarios donde puedes gestionar usuarios, ver información de usuarios y realizar tareas administrativas basadas en tus permisos.",
    "home.quickActions": "Acciones Rápidas",
    "home.viewUsers": "Ver Todos los Usuarios",
    "home.yourRole": "Tu Rol",
    "home.adminPermissions": "Acceso completo a todas las funciones",
    "home.userPermissions":
      "Acceso de visualización a la información del usuario",
    "home.accountInfo": "Información de la Cuenta",
    "home.registeredEmail": "Tu dirección de email registrada",
    "home.systemStatusTitle": "Estado del Sistema",
    "home.systemStatus": "Todos los sistemas operativos",
    "home.online": "En línea",
    "home.featuresTitle": "Funciones Disponibles",
    "home.feature.jwtAuth": "Autenticación segura basada en JWT",
    "home.feature.viewUsers": "Ver listados y detalles de usuarios",
    "home.feature.createUsers": "Crear nuevos usuarios",
    "home.feature.editUsers": "Editar usuarios existentes",
    "home.feature.deleteUsers": "Eliminar usuarios",
    "home.feature.roleAccess": "Control de acceso basado en roles",
    "home.feature.responsive": "Diseño responsivo",
    "home.feature.notifications": "Notificaciones en tiempo real",

    // Errors
    "error.fetchUsers": "Error al obtener usuarios",
    "error.fetchUser": "Error al obtener usuario",
    "error.createUser": "Error al crear usuario",
    "error.updateUser": "Error al actualizar usuario",
    "error.deleteUser": "Error al eliminar usuario",
    "error.loginFailed": "Error de inicio de sesión. Inténtalo de nuevo.",
    "error.unexpected": "Ocurrió un error inesperado",

    // General
    "general.welcome": "Bienvenido",
    "general.language": "Idioma",
  },
};

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to browser language
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }

    // Detect browser language
    const browserLanguage = navigator.language.split("-")[0];
    return translations[browserLanguage] ? browserLanguage : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || key;

    // Replace parameters in translation
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{${param}}`, params[param]);
    });

    return translation;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
