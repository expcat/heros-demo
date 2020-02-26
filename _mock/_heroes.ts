import { MockStatusError, MockRequest } from '@delon/mock';
import { Hero } from '@model/hero';

const heroes: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

function getHeros(): Hero[] {
  return heroes;
}

function updateHero(hero: Hero): void {
  const index = heroes.findIndex((h) => h.id === hero.id);
  if (index > -1) {
    heroes[index] = hero;
  }
}

function addHero(name: string): Hero {
  const hero: Hero = {
    id: genId(),
    name
  };
  heroes.push(hero);
  return hero;
}

function deleteHero(id: number): void {
  const index = heroes.findIndex((h) => h.id === id);
  if (index > -1) {
    heroes.splice(index, 1);
  }
}

function genId(): number {
  return heroes.length > 0
    ? Math.max(...heroes.map((hero) => hero.id)) + 1
    : 11;
}

function getHero(id: number): Hero {
  const index = heroes.findIndex((h) => h.id === id);
  if (index > -1) {
    return heroes[index];
  } else {
    return null;
  }
}

function getHeroNoData404(id: number): any {
  const hero = getHero(id);
  if (hero) {
    return hero;
  } else {
    throw new MockStatusError(404);
  }
}

function serchHeros(name: string): Hero[] {
  return heroes.filter((h) => h.name.includes(name));
}

export const HEROES = {
  'GET /api/heroes': getHeros(),
  'GET /api/heroes/:id': (req: MockRequest) => getHero(+req.params?.id),
  'GET /api/heroes/': (req: MockRequest) => {
    if (req.queryString?.name) {
      return serchHeros(req.queryString?.name);
    } else if (req.queryString?.id) {
      return getHeroNoData404(+req.queryString?.id);
    } else {
      throw new MockStatusError(404);
    }
  },
  'POST /api/heroes': (req: MockRequest) => addHero(req.body?.name),
  'PUT /api/heroes(.*)': (req: MockRequest) => updateHero(req.params),
  'DELETE /api/heroes/:id': (req: MockRequest) => deleteHero(+req.params?.id)
};
