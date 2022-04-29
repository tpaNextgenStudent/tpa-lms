import { ErrorView } from '../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Error() {
  const router = useRouter();

  return (
    <ErrorView
      title="*Something went wrong.*"
      description="Please, go back and log in again."
      primaryButton={{
        text: 'Back to login page',
        onClick: async () => {
          await axios.post('http://localhost:3000/api/createCurriculum/', {
            body: {
              name: 'toyota-02',
              modules: [
                {
                  id: 'mwc1',
                  name: 'Modeling with classes (I)',
                  tasks: [
                    {
                      id: 'mwc1.info.properties.md',
                      name: 'Class with properties that capture the data aspects of a core noun',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/mwc1.info.properties.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mvc1.info.constructor.md',
                      name: 'Class with constructor that initialize the data',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/mvw1.info.constructor.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.info.class_methods.md',
                      name: 'Class methods which change class state',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/mwc1.info.class_methods.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.code.toggl_task.md',
                      name: 'Toggl task',
                      type: 'code',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/mwc1.code.dart.toggl_task.md',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf16.toggl_task.code.dart',
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.code.spotify_playlist.md',
                      name: 'Spotify playlist',
                      type: 'code',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/master/outlines/model_with_classes_1/mwc1.code.dart.spotify_playlist.md',
                      link: 'https://github.com/tpa-nextgen/mwc1.spotify_playlist.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
                {
                  id: 'mwc2',
                  name: 'Modeling with classes (II)',
                  tasks: [
                    {
                      id: 'mwc2.info.aggregation.md',
                      name: 'Objects as a Property',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.aggregation.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mvc2.code.movies_database.md',
                      name: 'Movies database',
                      type: 'code',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.movies_database.md',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf07.movies_database.code.dart',
                      kind: 'formative',
                    },
                    {
                      id: 'mwc2.info.copy_of_object.md',
                      name: 'Creating a Copy of an Object',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.copy_of_object.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc2.code.movies_statistics.md',
                      name: 'Toggl task',
                      type: 'code',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.movies_statistics.md',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf10.movies_statistics.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
                {
                  id: 'mwc3',
                  name: 'Modeling with classes (III)',
                  tasks: [
                    {
                      id: 'mwc3.mcq.access_modifiers.md',
                      name: 'Access modifiers',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.access_modifiers.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.immutability.md',
                      name: 'Immutability',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.immutability.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.static.md',
                      name: 'Static Properties and Methods',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.static.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.scope.md',
                      name: 'Scope',
                      type: 'info',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.scope.md',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.tasks_manager.md',
                      name: 'Task manager',
                      type: 'code',
                      description:
                        'https://github.com/tpa-nextgen/modules-master/blob/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.tasks_manager.md',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf16.tasks_manager.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
              ],
            },
          });
          // router.push('/login');
        },
      }}
    />
  );
}
