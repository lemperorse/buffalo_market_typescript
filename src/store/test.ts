import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";

@Module({generateMutationSetters: true})
class TestClass extends VuexModule {
    //state
    private token: string | null = null;
    public Hi:String | null = 'Hello Vuexxxx';


    public getData(){
        alert('hi vuex')
    }


    @Action
    async logout(): Promise<void> {
 
        alert('hello');
    }
}

import store from "@/store" 
export const userModule = new TestClass({store, name: "Test"})
