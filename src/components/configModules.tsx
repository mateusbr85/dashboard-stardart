interface modules {
    modules: {
        label: string,
        icon: string,
        url: string
    }[],
}

const config: modules = {
    modules: [
        { label: 'Configurações', icon: 'fas fa-cogs fa-lg', url: 'settings'},
        { label: 'Relatorios', icon: 'fas fa-file-excel fa-lg', url: 'reports' },
        { label: 'Leads', icon: 'fas fa-address-book fa-lg', url: 'leads' },
    ]
}

export default config;