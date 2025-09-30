import { component$, useStore, useTask$, useSignal } from '@builder.io/qwik';
import type { Project, ProjectConnection, SortDirection } from '~/types/graphql';
import { createQueryExecutor, usePagination, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { GET_PROJECTS_QUERY } from '~/graphql/queries';

export const ProjectList = component$(() => {
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
      <div class="mb-12">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-4">Projects</h1>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            A showcase of my work, experiments, and contributions to the development community.
          </p>
        </div>
        
        {/* Action Bar */}
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="join">
            <input
              type="text"
              class="input input-bordered join-item w-full md:w-64"
              placeholder="Search projects..."
              value={searchTerm.value}
              onInput$={(e) => searchTerm.value = (e.target as HTMLInputElement).value}
            />
            <button class="btn btn-primary join-item">
              Search
            </button>
          </div>
          
          <a href="/projects/create" class="btn btn-secondary">
            <span class="text-lg mr-2">+</span>
            New Project
          </a>
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

      {/* Projects Grid */}
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

                <div class="flex items-center justify-between">
                  <a
                    href={`/projects/${project.id}`}
                    class="btn btn-primary btn-sm"
                  >
                    View Details
                  </a>
                  
                  {/* Admin Actions */}
                  <div class="dropdown dropdown-end">
                    <div tabIndex={0} role="button" class="btn btn-ghost btn-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                      </svg>
                    </div>
                    <ul tabIndex={0} class="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                      <li><a href={`/projects/edit/${project.id}`}>Edit</a></li>
                      <li><button class="text-error w-full text-left" onClick$={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          // TODO: Implement delete functionality
                          console.log('Delete project:', project.id);
                        }
                      }}>Delete</button></li>
                    </ul>
                  </div>
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
          <p class="text-base-content/70 mb-8">
            Start showcasing your work by creating your first project!
          </p>
          <a href="/projects/create" class="btn btn-primary">
            Create First Project
          </a>
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