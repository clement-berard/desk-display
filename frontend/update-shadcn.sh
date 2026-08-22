for dir in components/ui/*/; do
  name=$(basename "$dir")
  echo "Mise à jour : $name"
  pnpx shadcn-vue@latest add "$name" --overwrite -y || echo "Échec pour $name, ignoré"
done
