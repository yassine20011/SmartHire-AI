import CamelCaseNamingStrategy from '#strategies/CamelCaseNamingStrategy'
import { BaseModel } from '@adonisjs/lucid/orm'


class BaseModelWithCamelCase extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
}
export default BaseModelWithCamelCase
