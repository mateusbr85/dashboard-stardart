interface configProps {
    url: string;
    api_key: string
}

const configGlobals: configProps = {
    url: 'http://localhost:3001',
    api_key: 'mvdev-authenticated-3123123-token'
}


export { configGlobals }