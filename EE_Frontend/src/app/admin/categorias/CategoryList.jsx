import CategoryCard from './CategoryCard';

const CategoryList = ({ categorias, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categorias.map((categoria) => (
        <CategoryCard
          key={categoria.categoryId}
          categoria={categoria}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default CategoryList;
