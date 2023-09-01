import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/Historic";

export const {
    RealmProvider, // compartilha o acesso ao banco com a aplicação
    useRealm, // usar a instância do banco de dados
    useQuery, // implementar consultas no banco 
    useObject // obter um objeto especifico
} = createRealmContext({
    schema: [Historic]
});