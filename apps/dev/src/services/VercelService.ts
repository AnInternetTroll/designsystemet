export const getAliases = async () => {
  const res = await fetch('/api/alias/list');
  const aliases = await res.json();

  const filteredAliases = aliases.aliases.filter((item: any) =>
    item.alias.includes('pr'),
  );

  return filteredAliases;
};
