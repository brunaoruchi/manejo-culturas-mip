import { Mip } from "../database/models/Mip";

export const sync = async (
  realm: Realm,
  result: Realm.Results<Mip & Realm.Object<unknown, never>>,
  handleProgress?: (value: number) => void
) => {
  // TODO: Implementar

  const mips = result.filter((item) => item.isDirty);

  const promises: Promise<void>[] = [];

  mips.forEach((item) => {
    if (!item.isActive) {
      // Add promise no array de promise
      // Requisão de delete
      // deletar do banco
    }
    if (handleProgress) handleProgress(10);
    if (item.isDirty && item.isOnServer) {
      // Add promise no array de promise
      // Requisão de put
      // atualizar no banco
    }
    if (handleProgress) handleProgress(30);

    if (item.isDirty && !item.isOnServer) {
      // Add promise no array de promise
      // Requisão de post
      // atualizar no banco
    }
    if (handleProgress) handleProgress(50);
  });

  realm.write(async () => {
    await Promise.all(promises);
  });

  // Fazer get Ur
  if (handleProgress) handleProgress(60);

  // Fazer get Pragues
  if (handleProgress) handleProgress(80);

  // Fazer get mips
  if (handleProgress) handleProgress(100);
};
