import { component$, useStore, useTask$, useSignal } from '@builder.io/qwik';
import type { Project, ProjectConnection, SortDirection } from '~/types/graphql';
import { createQueryExecutor, usePagination, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { GET_PROJECTS_QUERY } from '~/graphql/queries';

export const PublicProjectList = component$(() => {
  const { variables, setPage, setPageSize, setSorting } = usePagination({
    page: 1,
    pageSize: 12,
    sortBy: 'createdAt',
    sortDirection: 'DESC' as SortDirection,
  });
  
  const searchTerm = useSignal('');
  const { setLoading, isLoading } = useLoadingState();
  const { setError, getError } = useErrorHandler();

  const projectState = useStore<{
    projects: Project[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    } | null;
  }>({
    projects: [],
    pagination: null,
  });

  const executeQuery = createQueryExecutor<ProjectConnection>(GET_PROJECTS_QUERY);

  // Fetch projects
  useTask$(({ track }) => {
    track(() => variables);
    
    const fetchProjects = async () => {
      setLoading('projects', true);
      setError('projects', undefined);

      try {
        const result = await executeQuery(variables);
        
        if (result) {
          projectState.projects = result.data;
          projectState.pagination = result.pagination;
        }
      } catch (error) {
        setError('projects', error instanceof Error ? error.message : 'Failed to load projects');
      } finally {
        setLoading('projects', false);
      }
    };

    fetchProjects();
  });

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate text helper
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div class="container mx-auto px-4 py-8">
      {/* Header */}
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Projects</h1>
        <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
          A showcase of my work, experiments, and contributions to the development community.
        </p>
      </div>

      {/* Search Bar */}
      <div class="mb-8 flex justify-center">
        <div class="join max-w-md w-full">
          <input
            type="text"
            class="input input-bordered join-item flex-1"
            placeholder="Search projects..."
            value={searchTerm.value}
            onInput$={(e) => searchTerm.value = (e.target as HTMLInputElement).value}
          />
          <button class="btn btn-primary join-item">
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading('projects') && (
        <div class="flex justify-center items-center min-h-64">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {/* Error State */}
      {getError('projects') && (
        <div class="alert alert-error mb-8">
          <span>{getError('projects')}</span>
        </div>
      )}

      {/* Sort Controls */}
      {!isLoading('projects') && projectState.projects.length > 0 && (
        <div class="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Sort by:</span>
            <div class="join">
              <button
                class={`btn btn-sm join-item ${variables.sortBy === 'createdAt' ? 'btn-active' : 'btn-outline'}`}
                onClick$={() => setSorting('createdAt')}
              >
                Date
              </button>
              <button
                class={`btn btn-sm join-item ${variables.sortBy === 'title' ? 'btn-active' : 'btn-outline'}`}
                onClick$={() => setSorting('title')}
              >
                Title
              </button>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Per page:</span>
            <select
              class="select select-bordered select-sm"
              value={variables.pageSize}
              onChange$={(e) => setPageSize(parseInt((e.target as HTMLSelectElement).value))}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      )}

      {/* Projects Grid - Public View (No Admin Actions) */}
      {!isLoading('projects') && !getError('projects') && projectState.projects.length > 0 && (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projectState.projects.map((project) => (
            <article key={project.id} class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div class="card-body">
                <h2 class="card-title text-lg mb-3">
                  <a href={`/projects/${project.id}`} class="hover:text-primary transition-colors">
                    {project.title}
                  </a>
                </h2>
                
                {project.description && (
                  <p class="text-base-content/70 text-sm mb-4 line-clamp-3">
                    {truncateText(project.description, 150)}
                  </p>
                )}
                
                <div class="flex items-center justify-between text-xs text-base-content/60 mb-3">
                  <div class="flex items-center gap-2">
                    {project.user && (
                      <span>By {project.user.name}</span>
                    )}
                    <span>• {formatDate(project.createdAt)}</span>
                  </div>
                </div>

                <div class="card-actions justify-end">
                  <a
                    href={`/projects/${project.id}`}
                    class="btn btn-primary btn-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading('projects') && !getError('projects') && projectState.projects.length === 0 && (
        <div class="text-center py-16">
          <div class="text-6xl mb-4">🚀</div>
          <h3 class="text-2xl font-bold mb-2">No projects yet</h3>
          <p class="text-base-content/70">
            Check back later for new projects!
          </p>
        </div>
      )}

      {/* Pagination */}
      {projectState.pagination && projectState.pagination.totalPages > 1 && (
        <div class="flex justify-center">
          <div class="join">
            <button
              class="join-item btn"
              disabled={projectState.pagination.page <= 1}
              onClick$={() => setPage(projectState.pagination!.page - 1)}
            >
              Previous
            </button>
            
            {Array.from({ length: projectState.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                class={`join-item btn ${pageNum === projectState.pagination!.page ? 'btn-active' : ''}`}
                onClick$={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              class="join-item btn"
              disabled={projectState.pagination.page >= projectState.pagination.totalPages}
              onClick$={() => setPage(projectState.pagination!.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
});