/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../database/Realm";
import { User } from "../database/models/User";
import uuid from 'react-native-uuid'

const { useRealm } = AppContext;

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  name: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  firstLoadCompleted: boolean;
  expiredSession: boolean;
  setFlagExpiredSession: () => void;
  setFlagFirstLoadCompleted: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<string>("");
  const [expiredSession, setExpiredSession] = useState(false);
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const realm = useRealm();

  async function signIn({ email, password }: SignInCredentials) {
    // Buscar no banco e atualizar
    // TODO: Fazer chama a api com o email e senha, deve retornar o token (usar nas requisições depois, vai adicionar no axios header), um id e um nome. Nome salvar no user
    realm.write(() => {
      const user = new User(realm, uuid.v4() as string, "Br3131uno")
      setData(user.name);
    });

    AsyncStorage.setItem("@manejo:userId", "id");
  }

  async function signOut() {
    realm.write(() => {
      realm.deleteAll();
    });
    AsyncStorage.setItem("@manejo:firstLoadCompleted", "false");
    AsyncStorage.setItem("@manejo:expiredSession", "false");
    AsyncStorage.setItem("@manejo:userId", "");
    setData("");
    setFirstLoadCompleted(false);
    setExpiredSession(false);
  }

  function setFlagExpiredSession() {
    AsyncStorage.setItem("@manejo:expiredSession", "true");
    setExpiredSession(true);
  }

  function setFlagFirstLoadCompleted() {
    AsyncStorage.setItem("@manejo:firstLoadCompleted", "true");
    setFirstLoadCompleted(true);
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const isFirstLoadCompleted = await AsyncStorage.getItem(
          "@manejo:firstLoadCompleted"
        );
        const isExpiredSession = await AsyncStorage.getItem(
          "@manejo:expiredSession"
        );
        const userId = await AsyncStorage.getItem("@manejo:userId");
        setExpiredSession(isExpiredSession === "true");
        setFirstLoadCompleted(isFirstLoadCompleted === "true");
        //   const userCollection = database.get<User>('users');
        //   const response = await userCollection.query().fetch();
        //   if (response.length > 0) {
        //     const userData = response[0]._raw as unknown as User;
        //     api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        setData(userId);
        //   }
      } catch (e) {
        setExpiredSession(true);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        name: data,
        signIn,
        signOut,
        firstLoadCompleted,
        setFlagFirstLoadCompleted,
        expiredSession,
        setFlagExpiredSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
