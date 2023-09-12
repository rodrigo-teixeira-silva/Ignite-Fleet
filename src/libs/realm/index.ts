import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/Historic";

const realmAcessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
    flexible: true,
    newRealmFileBehavior: realmAcessBehavior, // comportamento para sincronizar banco quando está iniciando 
    existingRealmFileBehavior: realmAcessBehavior, //comportamento para sincronizar banco com dados já existentes
}

export const {
    RealmProvider, // compartilha o acesso ao banco com a aplicação
    useRealm, // usar a instância do banco de dados
    useQuery, // implementar consultas no banco 
    useObject // obter um objeto especifico
} = createRealmContext({
    schema: [Historic]
});